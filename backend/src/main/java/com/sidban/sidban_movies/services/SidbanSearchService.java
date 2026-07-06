package com.sidban.sidban_movies.services;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class SidbanSearchService {

    @Value("${sidban.movies.api.key}")
    private String sidbanMoviesApi;

    @Autowired
    private RestTemplate restTemplate;
    
        public SidbanSearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

   
    private final Map<String, String> cache = new ConcurrentHashMap<>();

    
    private final Map<String, Long> cacheTime = new ConcurrentHashMap<>();

    private static final long CACHE_DURATION = 30 * 60 * 1000; 
    private static final int MAX_RETRIES = 3;

    public ResponseEntity<?> sidbanSearchService(String query) {

        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search query required");
        }

        query = query.trim().toLowerCase();
        long now = System.currentTimeMillis();

        
        if (cache.containsKey(query)
                && cacheTime.containsKey(query)
                && (now - cacheTime.get(query)) < CACHE_DURATION) {

            System.out.println("CACHE HIT: " + query);
            return ResponseEntity.ok(cache.get(query));
        }

      
        cache.remove(query);
        cacheTime.remove(query);

        String url = "https://api.themoviedb.org/3/search/multi"
                + "?api_key=" + sidbanMoviesApi
                + "&query=" + URLEncoder.encode(query, StandardCharsets.UTF_8)
                + "&page=1";

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {

            try {
                System.out.println("TMDB REQUEST: " + query + " (Attempt " + attempt + ")");

                String response = restTemplate.getForObject(url, String.class);

                if (response != null) {

                
                    JsonNode root = objectMapper.readTree(response);
                    ArrayNode results = (ArrayNode) root.get("results");

                    ArrayNode filtered = objectMapper.createArrayNode();

                    for (JsonNode item : results) {
                        String type = item.has("media_type") ? item.get("media_type").asText() : "";

                      
                        if ("movie".equals(type) || "tv".equals(type)) {
                            filtered.add(item);
                        }
                    }

                  
                    ObjectNode finalResponse = objectMapper.createObjectNode();
                    finalResponse.set("results", filtered);
                    finalResponse.put("total_results", filtered.size());

                    String finalJson = objectMapper.writeValueAsString(finalResponse);

                    // cache it
                    cache.put(query, finalJson);
                    cacheTime.put(query, System.currentTimeMillis());

                

                    return ResponseEntity.ok(finalJson);
                }

            } catch (Exception e) {

            

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                }
            }
        }

     
        if (cache.containsKey(query)) {
         
            return ResponseEntity.ok(cache.get(query));
        }

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body("TMDB temporarily unavailable. Please try again later.");
    }
}
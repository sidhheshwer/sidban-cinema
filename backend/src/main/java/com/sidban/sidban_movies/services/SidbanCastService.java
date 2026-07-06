package com.sidban.sidban_movies.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sidban.sidban_movies.dto.SidbanCrewDto;

@Service
public class SidbanCastService {

    @Value("${sidban.movies.api.key}")
    private String sidbanMoviesApi;

    @Autowired
    private RestTemplate restTemplate;

    private final Map<String, SidbanCrewDto> castCache = new HashMap<>();

    public SidbanCastService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<SidbanCrewDto> sidbanCastService(String type,String id) {
        try {

            if (castCache.containsKey(id)) {
                System.out.println("Returning cached cast for movie id: " + id);
                return ResponseEntity.ok(castCache.get(id));
            }

            String url;
         

        if ("tv".equals(type)) {
            url = "https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=" + sidbanMoviesApi;
        } else {
            url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + sidbanMoviesApi;
        }

          //  System.out.println("Fetching cast from TMDB for movie id: " + id);

            SidbanCrewDto response =
                    restTemplate.getForObject(url, SidbanCrewDto.class);

            if (response != null) {
                castCache.put(id, response);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
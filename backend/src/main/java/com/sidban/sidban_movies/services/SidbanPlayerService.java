package com.sidban.sidban_movies.services;

import java.util.Arrays;
import java.util.List;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.sidban.sidban_movies.dto.SidbanPlayerDto;

@Service
public class SidbanPlayerService {

   
   public ResponseEntity<?> sidbanPlayerService(String id) {
         
    List<String> urls = Arrays.asList(
         "https://vaplayer.ru/embed/movie/" + id,
         "https://vidsrc.sbs/embed/movie/" + id,
        "https://www.vidking.net/embed/movie/" + id,
        "https://vixsrc.to/movie/" + id,
         "https://vidphantom.com/movie/" + id,
        "https://vidnest.fun/movie/" + id
    );

    SidbanPlayerDto dto =new SidbanPlayerDto(urls, "SidbanURL SUCCESSFULL!");

    return ResponseEntity.ok(dto);
}
}
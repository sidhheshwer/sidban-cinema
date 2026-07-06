package com.sidban.sidban_movies.services;

import java.util.Arrays;
import java.util.List;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.sidban.sidban_movies.dto.SidbanPlayerDto;

@Service
public class SidbanSeriesPlayerService {


   public ResponseEntity<?> sidbanSeriesPlayerService(String id) {

    List<String> urls = Arrays.asList(
         "https://vaplayer.ru/embed/tv/"+id,
         "https://vidsrc.sbs/embed/tv/"+id,
        "https://www.vidking.net/embed/tv/"+id,
        "https://vixsrc.to/movie/tv/"+id,
         "https://vidphantom.com/tv/"+id,
        "https://vidnest.fun/tv/"+id
    );

    SidbanPlayerDto dto =
        new SidbanPlayerDto(urls, "SidbanSeriesURL SUCCESSFULL!");

    return ResponseEntity.ok(dto);
}



 public ResponseEntity<?> sidbanSeriesPlayerTwoService(String id,String season,String episode) {

    List<String> urls = Arrays.asList(
         "https://vaplayer.ru/embed/tv/" + id +"/"+season+"/"+episode,
         "https://vidsrc.sbs/embed/tv/" + id +"/"+season+"/"+episode,
        "https://www.vidking.net/embed/tv/" + id +"/"+season+"/"+episode,
        "https://vixsrc.to/movie/tv/" + id +"/"+season+"/"+episode,
         "https://vidphantom.com/tv/" + id +"/"+season+"/"+episode,
        "https://vidnest.fun/tv/" + id +"/"+season+"/"+episode
    );

    SidbanPlayerDto dto =
        new SidbanPlayerDto(urls, "SidbanSeriesURL SUCCESSFULL!");

    return ResponseEntity.ok(dto);
}
}


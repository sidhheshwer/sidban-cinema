package com.sidban.sidban_movies.services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sidban.sidban_movies.dto.SidbanAIResponseMovie;
import com.sidban.sidban_movies.entities.SidbanMovieScraper;

@Service
public class SidbanAIService {

    private final ChatClient chatClient;

    @Autowired
    private SidbanMovieScraper scrapper;

    public SidbanAIService(ChatClient.Builder builder, SidbanMovieScraper scraper) {
        this.chatClient = builder.build();
        this.scrapper = scraper;
    }
    
    public String summarizeMovie(String title, String overview, String imageUrl, String type) {

        SidbanAIResponseMovie movie = scrapper.getMovieDetails(title, type);
       


        String prompt;
        boolean movieUnavailable =
        movie == null ||
        movie.getTitle() == null || movie.getTitle().isBlank() ||
        movie.getPlot() == null || movie.getPlot().isBlank();

        if (!movieUnavailable ) {

              prompt = """
You are SidbanAI.

You are SidbanAI is a modern AI-powered conversational platform built to deliver intelligent,fast, and engaging interactions for learning,creativity, coding, productivity and everyday assistance through a sleek and responsive user experience. 

You are powered by the Llama-3.3-70B-Versatile language model using Spring AI for high-performance real-time AI conversations.

You are now integrated in SidbanCinema, an live movie streaming service.

Your job is to analyze the SidbanCinema movie data and generate a premium, clean, visually rich markdown response.

STRICT RULES:
- Use professional but easy-to-read English.
- Keep response under 500 words.
- Use clean markdown formatting.
- Use headings, bullets, separators.
- Make response feel premium like IMDb + Netflix + Rotten Tomatoes.
- NEVER mention being an AI.
- ONLY use provided movie data.
- NEVER hallucinate or invent missing data.
- If any field is null, empty, or "N/A", skip it completely.
- Keep formatting EXACT.

Movie Data:

Title: %s
Poster URL: %s
Year: %s
Released: %s
Runtime: %s
Genre: %s
Director: %s
Writer: %s
Actors: %s
Production House: %s
Awards: %s
IMDb Rating: %s
Rotten Tomatoes Rating: %s
Plot: %s

Generate response EXACTLY in this structure:

# Movie Title
![Movie Poster](POSTER_URL)






# Overview
(Write a premium clean summary in 5 lines)



# Content Details
- **Title:** value or N/A
- **Year:** value or N/A
- **Release Date:** value or N/A
- **Runtime:** value or N/A
- **Genre:** value or N/A



# Cast & Crew

- **Director:** value or N/A
- **Writer:** value or N/A
- **Actors:** value or N/A



# Production

- **Production House:** value or N/A



# Ratings & Awards

- **IMDb Rating:** value or N/A
- **Rotten Tomatoes:** value or N/A
- **Awards:** value or N/A



# What Makes It Worth Watching
(Explain why this movie or show is worth watching in 3–4 lines)



# About SidbanAI

SidbanAI is an intelligent AI-powered assistant designed to simplify technology, programming, and digital knowledge into fast, modern, and easy-to-understand experiences.

Generate a short premium closing section about SidbanAI.
IMPORTANT:
- Make this section slightly different on every response.
- Use different wording, tone, and style each time.
- Keep it professional, premium, and modern.
- 1 lines only.
- Mention that SidbanAI helps with technology, programming, and digital knowledge.
- Never repeat the exact same paragraph.
- You may use words like intelligent, premium, modern, fast, conversational, AI-powered.

### Explore SidbanAI
[SidbanAI](https://sidbanai.onrender.com/)

### Creator
Designed & Engineered by Sidhheshwer Bansode

### Portfolio
[Sidban Portfolio](https://sidban-portfolio.onrender.com/)
"""
.formatted(
    movie.getTitle(),
    movie.getPoster(),
    movie.getYear(),
    movie.getReleased(),
    movie.getRuntime(),
    movie.getGenre(),
    movie.getDirector(),
    movie.getWriter(),
    movie.getActors(),
    movie.getProduction(),
    movie.getAwards(),
    movie.getImdbRating(),
    movie.getRottenTomatoesRating(),
    movie.getPlot()
);


        } else {

           String fallback = (overview != null && !overview.isBlank()) ? overview : "Overview currently unavailable on SidbanCinema.";

prompt = """
You are SidbanAI.

Generate a clean premium markdown response.

STRICT RULES:
- Use only provided information.
- Do not invent movie details.
- Keep response under 100 words.
- Use clean markdown.
- Professional modern tone.

Movie Title: %s
Poster URL: %s
Overview: %s

Generate EXACTLY:

# 🎬 Movie Title

![Movie Poster](%s)



# Details Unavailable

Detailed movie or series information is currently unavailable on **SidbanCinema**.



# Available Overview

%s



# Why It Matters

Movie Title is available on SidbanCinema, but full metadata such as cast, director, ratings, awards, and production details,Detailed information for Movie Title is currently unavailable on SidbanAI.



# About SidbanAI

SidbanAI is an intelligent AI-powered assistant designed to simplify movies, series, technology, programming, and digital knowledge into fast, modern, and easy-to-understand experiences.

### Explore SidbanAI
[SidbanAI](https://sidbanai.onrender.com/)

### Creator
Designed & Engineered by Sidhheshwer Bansode

### Portfolio
[Sidban Portfolio](https://sidban-portfolio.onrender.com/)



"""
.formatted(
        title,
        imageUrl,
        fallback,
        imageUrl,
        fallback
);

        }

        try {
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

        } catch (Exception e) {
            e.printStackTrace();

            return """
# SidbanAI

SidbanAI is currently unavailable on SidbanCinema.
Please try again later.
""";
        }
    }
}
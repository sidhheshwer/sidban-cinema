package com.sidban.sidban_movies.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.sidban.sidban_movies.authentications.JwtGen;
import com.sidban.sidban_movies.dto.SidbanAuthResponseDto;
import com.sidban.sidban_movies.dto.SidbanLoginDto;

import com.sidban.sidban_movies.entities.SidbanLoginEntity;
import com.sidban.sidban_movies.entities.SidbanSigninEntity;
import com.sidban.sidban_movies.repository.LoginRepo;
import com.sidban.sidban_movies.repository.SigninRepo;
import org.springframework.security.crypto.bcrypt.*;

@Service
public class SidbanLoginService {

    @Autowired
    LoginRepo loginRepo;

     @Autowired
    SigninRepo signinRepo;

    @Autowired
    JwtGen genToken;

    public SidbanLoginService(LoginRepo loginRepo, JwtGen genToken,SigninRepo signinRepo) {
        this.loginRepo = loginRepo;
        this.genToken = genToken;
        this.signinRepo=signinRepo;
    }

    public ResponseEntity<SidbanAuthResponseDto> sidbanLoginService(SidbanLoginDto loginData) {
        try {

            SidbanSigninEntity existingEmail = signinRepo.findByEmail(loginData.getEmail());
            
           
   
            if (existingEmail == null) {
                SidbanAuthResponseDto response = new SidbanAuthResponseDto("", "Invalid email","");
                return new ResponseEntity<>(response,  HttpStatus.NOT_FOUND);
            }
           boolean validPassword = BCrypt.checkpw(loginData.getPassword(), existingEmail.getPassword());

           if (!validPassword) {SidbanAuthResponseDto response =new SidbanAuthResponseDto("", "Invalid password","");

                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
            
          
  SidbanLoginEntity existingLoginEmail = loginRepo.findByEmail(loginData.getEmail());

if (existingLoginEmail == null) {
    SidbanLoginEntity newLogin = new SidbanLoginEntity();
    newLogin.setEmail(loginData.getEmail());

    loginRepo.save(newLogin);
}

            
           
            

          


            String token = genToken.generateToken(loginData.getEmail());

            ResponseCookie cookie = ResponseCookie.from("sidbanCinemaKey", token)
                    .httpOnly(true)
                    .secure(true) 
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

           String existingProfilePic=existingEmail.getProfile_pic();
           String existingUsername=existingEmail.getUsername();


            SidbanAuthResponseDto authDto = new SidbanAuthResponseDto(existingUsername, "Login Successfull",existingProfilePic);
            return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body(authDto);

        } catch (Exception e) {
            e.printStackTrace();
            SidbanAuthResponseDto authDto = new SidbanAuthResponseDto("", "Login Unsuccessfull","");
            return new ResponseEntity<>(authDto, HttpStatus.UNAUTHORIZED);
        }
    }
}

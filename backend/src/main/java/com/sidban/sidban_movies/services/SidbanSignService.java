package com.sidban.sidban_movies.services;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.sidban.sidban_movies.authentications.JwtGen;
import com.sidban.sidban_movies.dto.SidbanAuthResponseDto;
import com.sidban.sidban_movies.dto.SidbanSignDto;
import com.sidban.sidban_movies.entities.SidbanSigninEntity;
import com.sidban.sidban_movies.repository.SigninRepo;
import org.springframework.security.crypto.bcrypt.*;

@Service
public class SidbanSignService {

    @Autowired
    SigninRepo signinRepo;

    @Autowired
    JwtGen genToken;

    @Autowired
Cloudinary cloudinary;

    public SidbanSignService(SigninRepo signinRepo, JwtGen genToken,Cloudinary cloudinary) {
        this.signinRepo = signinRepo;
        this.genToken = genToken;
        this.cloudinary=cloudinary;
    }

    public ResponseEntity<SidbanAuthResponseDto> sidbanSignService(SidbanSignDto signData) {
        try {

            SidbanSigninEntity existingEmail = signinRepo.findByEmail(signData.getEmail());
            SidbanSigninEntity existingUsername = signinRepo.findByUsername(signData.getUsername());

            if (existingEmail != null) {
                SidbanAuthResponseDto response = new SidbanAuthResponseDto("", "User already exists","");
                return new ResponseEntity<>(response, HttpStatus.CONFLICT);
            }
            if (existingUsername != null) {
                SidbanAuthResponseDto response = new SidbanAuthResponseDto("",
                        "'" + existingUsername.getUsername() + "'" + " username is unavailable. Try another.","");
                return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            if (signData.getPassword() == null || signData.getPassword().length() < 6) {

                SidbanAuthResponseDto response = new SidbanAuthResponseDto("","Password must be at least 6 characters long.","");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            SidbanSigninEntity newSignin = new SidbanSigninEntity();

            newSignin.setEmail(signData.getEmail());

            String hashPass = BCrypt.hashpw(signData.getPassword(), BCrypt.gensalt());
            newSignin.setPassword(hashPass);

            newSignin.setUsername(signData.getUsername());

            MultipartFile file = signData.getProfile_pic();

            if(file.getSize() > 1024 * 1024){
    throw new RuntimeException("Profile picture must be less than 1MB");
}

                   Map uploadResult = cloudinary.uploader().upload(
                              file.getBytes(),
                         Map.of("folder", "sidban-profile-pics")
                         );
         String imageUrl = uploadResult.get("secure_url").toString();

              newSignin.setProfile_pic(imageUrl);


            String token = genToken.generateToken(newSignin.getEmail());

            ResponseCookie cookie = ResponseCookie.from("sidbanCinemaKey", token)
                    .httpOnly(true)
                    .secure(true) 
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            signinRepo.save(newSignin);
            SidbanAuthResponseDto authDto = new SidbanAuthResponseDto(signData.getUsername(), "Signin Successfull",newSignin.getProfile_pic());
            return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body(authDto);

        } catch (Exception e) {
            e.printStackTrace();
            SidbanAuthResponseDto authDto = new SidbanAuthResponseDto("", "Signin Unsuccessfull","");
            return new ResponseEntity<>(authDto, HttpStatus.UNAUTHORIZED);
        }
    }
}

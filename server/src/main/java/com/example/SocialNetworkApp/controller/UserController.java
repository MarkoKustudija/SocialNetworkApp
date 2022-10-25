package com.example.SocialNetworkApp.controller;

import com.example.SocialNetworkApp.dto.UserDto;
import com.example.SocialNetworkApp.model.User;
import com.example.SocialNetworkApp.service.UserService;
import com.example.SocialNetworkApp.shared.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/users")
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    Utils utils;

    @PostMapping
    public ResponseEntity<UserDto> create (@RequestBody UserDto userDTO){

        String publicUserId = utils.generateUserId(30);
        String encryptedPassword = utils.generateEncryptedPassword(30);

        User u = new User();
        u.setUserId(publicUserId);
        u.setFirstName(userDTO.getFirstName());
        u.setLastName(userDTO.getLastName());
        u.setUsername(userDTO.getUsername());
        u.setEncryptedPassword(encryptedPassword);

        u = userService.save(u);

        return new ResponseEntity<>(new UserDto(u), HttpStatus.CREATED);

    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDto>getUser(@PathVariable Long id){

        User u = userService.findOne(id);
        return new ResponseEntity<>(new UserDto(u), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>>getAll(Pageable page){
        Page<User> users = userService.findAll(page);
        List<UserDto> retValue = new ArrayList<>();

        for (User user : users) {
            UserDto userDto = new UserDto(user);
            retValue.add(userDto);

        }
        return new ResponseEntity<>(retValue, HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody UserDto userDto){
        User u = userService.findOne(id);
        if(u == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        u.setFirstName(userDto.getFirstName());
        u.setLastName(userDto.getLastName());

        User updatedUser = userService.save(u);

        return new ResponseEntity<>(new UserDto(updatedUser), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){

        User u = userService.findOne(id);
        if(u == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            userService.remove(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }


    }



}

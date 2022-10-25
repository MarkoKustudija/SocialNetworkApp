package com.example.SocialNetworkApp.dto;

import com.example.SocialNetworkApp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String userId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String encryptedPassword;

    public UserDto(User u) {
        this.id = u.getId();
        this.userId = u.getUserId();
        this.firstName = u.getFirstName();
        this.lastName = u.getLastName();
        this.username = u.getUsername();
//        this.password = u.getPassword();
        this.encryptedPassword = u.getEncryptedPassword();

    }
}

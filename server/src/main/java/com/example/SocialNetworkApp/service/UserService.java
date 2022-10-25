package com.example.SocialNetworkApp.service;

import com.example.SocialNetworkApp.repository.UserRepository;
import com.example.SocialNetworkApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public User save(User u) {

        return userRepository.save(u);
    }

    public User findOne(Long id) {
        return userRepository.findById(id).get();
    }

    public Page<User> findAll(Pageable page) {
        return userRepository.findAll(page);
    }

    public void remove(Long id) {
        userRepository.deleteById(id);
    }
}

package com.example.SocialNetworkApp.service;

import com.example.SocialNetworkApp.dto.PostDto;
import com.example.SocialNetworkApp.repository.PostRepository;
import com.example.SocialNetworkApp.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    
    @Autowired
    PostRepository postRepository;


    public Page<Post> findAll(Pageable page) {
        return  postRepository.findAll(page);
    }

    public Post findOne(Long id) {
        return  postRepository.findById(id).get();
    }

    public Post save(Post p) {
        return postRepository.save(p);
    }

    public void remove(Long id) {
        postRepository.deleteById(id);
    }

    public void removeAll(List<PostDto> retValue) {
        postRepository.deleteAll();
    }
}

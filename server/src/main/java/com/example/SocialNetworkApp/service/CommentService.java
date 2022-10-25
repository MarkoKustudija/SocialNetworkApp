package com.example.SocialNetworkApp.service;

import com.example.SocialNetworkApp.dto.CommentDto;
import com.example.SocialNetworkApp.repository.CommentRepository;
import com.example.SocialNetworkApp.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;


    public Page<Comment> findAll(Pageable page) {
        return commentRepository.findAll(page);
    }

    public Comment findOne(Long id) {
        return commentRepository.findById(id).get();
    }

    public Comment save(Comment c) {
        return commentRepository.save(c);
    }

    public void remove(Long id) {
        commentRepository.deleteById(id);
    }

    public void removeAll(List<CommentDto> commentDtos) {
        commentRepository.deleteAll();
    }
}

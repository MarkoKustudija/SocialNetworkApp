package com.example.SocialNetworkApp.dto;

import com.example.SocialNetworkApp.model.Comment;
import com.example.SocialNetworkApp.model.Post;
import com.example.SocialNetworkApp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {


    private Long id;
    private String postId;
    private String title;
    private String content;
    private User user;


    public PostDto(Post p) {
        this.id = p.getId();
        this.postId = p.getPostId();
        this.title = p.getTitle();
        this.content = p.getContent();
        this.user = p.getUser();
    }
}

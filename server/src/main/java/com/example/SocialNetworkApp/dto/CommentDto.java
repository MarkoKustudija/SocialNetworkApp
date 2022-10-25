package com.example.SocialNetworkApp.dto;

import com.example.SocialNetworkApp.model.Comment;
import com.example.SocialNetworkApp.model.Post;
import com.example.SocialNetworkApp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {


    private Long id;
    private String commentId;
    private String content;
    private Post post;
    private User user;


    public CommentDto(Comment c) {
        this.id = c.getId();
        this.commentId = c.getCommentIt();
        this.content = c.getContent();
        this.post = c.getPost();
        this.user = c.getUser();
    }


}

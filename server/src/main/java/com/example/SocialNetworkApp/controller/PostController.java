package com.example.SocialNetworkApp.controller;

import com.example.SocialNetworkApp.dto.CommentDto;
import com.example.SocialNetworkApp.dto.PostDto;
import com.example.SocialNetworkApp.model.Comment;
import com.example.SocialNetworkApp.model.Post;
import com.example.SocialNetworkApp.service.CommentService;
import com.example.SocialNetworkApp.service.PostService;
import com.example.SocialNetworkApp.shared.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "api/posts")
@CrossOrigin(origins = {"http://localhost:4200"})
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @Autowired
    Utils utils;

    @PostMapping
    public ResponseEntity<PostDto> create(@RequestBody PostDto postDTO) {

        Post p = new Post();
        p.setPostId(utils.generatePostId(30));
        p.setContent(postDTO.getContent());
        p.setTitle(postDTO.getTitle());
        p.setUser(postDTO.getUser());

        p = postService.save(p);

        return new ResponseEntity<>(new PostDto(p), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(Pageable page) {
        Page<Post> posts = postService.findAll(page);

        List<PostDto> retVal = new ArrayList<>();

        for(Post p : posts) {
            retVal.add(new PostDto(p));
        }

        Collections.reverse(retVal);
        return new ResponseEntity<>(retVal, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PostDto> getOnePost(@PathVariable Long id) {
        Post retValue = postService.findOne(id);
//        PostDto dto = new PostDto(retValue);
        return new ResponseEntity<>(new PostDto(retValue), HttpStatus.OK);
    }


    @PutMapping(path = "/{id}")
    public ResponseEntity<PostDto> update(@PathVariable Long id, @RequestBody PostDto postDTO) {

        Post p = new Post();
        p.setId(postDTO.getId());
        p.setContent(postDTO.getContent());
        p.setTitle(postDTO.getTitle());

        p = postService.save(p);

        return new ResponseEntity<>(new PostDto(p), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Post p = postService.findOne(id);
        if (p != null) {
            postService.remove(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public  ResponseEntity<List<PostDto>> deleteAllCommentsAndPosts(Pageable page) {

        /** 1st deleting all comments*/
        Page<Comment> comments = commentService.findAll(page);
        List<CommentDto> commentDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto dto = new CommentDto(comment);
            commentDtos.add(dto);
        }

        commentService.removeAll(commentDtos);

        /** 2nd deleting all posts*/

        Page<Post> posts = postService.findAll(page);
        List<PostDto> retValue = new ArrayList<>();

        for (Post post : posts) {
            PostDto postDto = new PostDto(post);
            retValue.add(postDto);
        }

        postService.removeAll(retValue);

        return  new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }


//    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
//    public ResponseEntity<List<PostDTO>> getPostsForUser(Pageable page, @PathVariable Long id) {
//
//        Page<Post> posts = postService.findAll(page);
//
//        List<PostDTO> retVal = new ArrayList<>();
//
//        for(Post p : posts) {
//            if (p.getUser().getId() == id ) {
//
//                retVal.add(new PostDTO(p));
//
//            }
//
//        }
//
//        return new ResponseEntity<>(retVal, HttpStatus.OK) ;
//
//
//    }
}

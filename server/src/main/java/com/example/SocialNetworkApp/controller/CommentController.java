package com.example.SocialNetworkApp.controller;

import com.example.SocialNetworkApp.dto.CommentDto;
import com.example.SocialNetworkApp.model.Comment;
import com.example.SocialNetworkApp.service.CommentService;
import com.example.SocialNetworkApp.shared.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    Utils utils;

    @PostMapping
    public ResponseEntity<CommentDto> create(@RequestBody CommentDto commentDto) {

        Comment c = new Comment();
        c.setCommentIt(utils.generateCommentId(30));
        c.setPost(commentDto.getPost());
        c.setContent(commentDto.getContent());
        c.setUser(commentDto.getUser());

        c = commentService.save(c);

        return new ResponseEntity<>(new CommentDto(c), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CommentDto>> getAllComments(Pageable page) {
        Page<Comment> comments = commentService.findAll(page);

        List<CommentDto> retVal = new ArrayList<>();

        for(Comment c : comments) {
            retVal.add(new CommentDto(c));
        }
        return new ResponseEntity<>(retVal, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CommentDto> getOneComment(@PathVariable Long id) {
        Comment retValue = commentService.findOne(id);
//        CommentD dto = new CommentDTO(retValue);

        return new ResponseEntity<>(new CommentDto(retValue), HttpStatus.OK);
    }



    @PutMapping(path = "/{id}")
    public ResponseEntity<CommentDto> update(@PathVariable Long id,@RequestBody CommentDto postDTO) {

		Comment comment = commentService.findOne(id);
		if(comment == null) {
			return new ResponseEntity<CommentDto>(HttpStatus.NOT_FOUND);
		}

        Comment p = new Comment();
//        p.setId(postDTO.getId());
        p.setPost(postDTO.getPost());
        p.setContent(postDTO.getContent());

        p = commentService.save(p);

        return new ResponseEntity<>(new CommentDto(p), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")

    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Comment p = commentService.findOne(id);
        if (p != null) {
            commentService.remove(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/post/{id}")
    public ResponseEntity<List<CommentDto>> getCommentsForPost(Pageable page, @PathVariable Long id) {

        Page<Comment> comments = commentService.findAll(page);

        List<CommentDto> retVal = new ArrayList<>();

        for(Comment c : comments) {
            if (c.getPost().getId() == id ) {
                CommentDto dto = new CommentDto(c);
                retVal.add(dto);
            }
        }

        return new ResponseEntity<>(retVal, HttpStatus.OK) ;


    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<CommentDto>> getCommentsForUser(Pageable page, @PathVariable Long id) {

        Page<Comment> comments = commentService.findAll(page);

        List<CommentDto> retVal = new ArrayList<>();

        for(Comment c : comments) {
            if (c.getUser().getId() == id ) {
                CommentDto dto = new CommentDto(c);
                retVal.add(dto);

            }

        }

        return new ResponseEntity<>(retVal, HttpStatus.OK) ;


    }







}

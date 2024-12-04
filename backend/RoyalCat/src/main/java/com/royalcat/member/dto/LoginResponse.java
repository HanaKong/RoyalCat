package com.royalcat.member.dto;

import com.royalcat.member.entity.Authority;
import com.royalcat.member.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder @AllArgsConstructor @NoArgsConstructor
public class LoginResponse {

    private String nickname;
    private List<Authority> roles = new ArrayList<>();
    private String token;

    public LoginResponse(User user) {
        this.nickname = user.getNickname();
        this.roles = user.getRoles();
    }
}

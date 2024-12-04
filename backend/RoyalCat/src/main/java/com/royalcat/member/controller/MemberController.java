package com.royalcat.member.controller;

import com.royalcat.member.dto.LoginRequest;
import com.royalcat.member.dto.LoginResponse;
import com.royalcat.member.dto.SignupRequest;
import com.royalcat.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
        return ResponseEntity.ok(memberService.login(loginRequest));
    }

    @PostMapping("/logout/{userName}")
    public ResponseEntity<String> logout(@PathVariable("userName") String userName) {
        memberService.logout(userName);
        System.out.println("호출 " + userName);
        return ResponseEntity.ok("로그아웃 성공");
    }

    @GetMapping("/login/{userName}")
    public boolean isLoggedIn(@PathVariable("userName") String userName) {
        return memberService.isLoggedIn(userName);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> singup(@RequestBody SignupRequest signupRequest) throws Exception {
        // null 확인
        if (signupRequest == null) {
            return ResponseEntity.badRequest().body("유저 정보가 올바르지 않습니다.");
        }

        // 아이디 중복 체크
        if (memberService.isDuplicateByUserName(signupRequest.getUserName())) {
            return ResponseEntity.status(409).body("아이디가 이미 존재합니다.");
        }

        // 닉네임 중복 체크
        if (memberService.isDuplicateByNickname(signupRequest.getNickname())) {
            return ResponseEntity.status(409).body("닉네임이 이미 존재합니다.");
        }

        // 중복 없으면 회원가입 후 응답
        return ResponseEntity.ok(memberService.join(signupRequest));
    }

    @GetMapping("/signup/exists")
    public boolean isDuplicate(@RequestParam("type") String type, @RequestParam("value") String value) {
        if ("id".equals(type)) {
            return memberService.isDuplicateByUserName(value);
        } else if ("nickname".equals(type)) {
            return memberService.isDuplicateByNickname(value);
        } else {
            throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    @GetMapping("/user/{userName}")
    public ResponseEntity<LoginResponse> getUser(@PathVariable("userName") String userName) throws Exception {
        return ResponseEntity.ok(memberService.getUser(userName));
    }

    @GetMapping("/user/test")
    public String Test() {
        return "Test";
    }

}


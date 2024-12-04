package com.royalcat.member.service;

import com.royalcat.member.dto.LoginRequest;
import com.royalcat.member.dto.LoginResponse;
import com.royalcat.member.dto.SignupRequest;
import com.royalcat.member.entity.Authority;
import com.royalcat.member.entity.Password;
import com.royalcat.member.entity.Profile;
import com.royalcat.member.entity.User;
import com.royalcat.member.repository.MemberRepository;
import com.royalcat.security.CustomUserDetails;
import com.royalcat.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public LoginResponse login(LoginRequest loginRequest) throws Exception {
        User user = memberRepository.findByUserName(loginRequest.getUserName()).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정 정보입니다."));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("잘못된 계정 정보입니다.");
        }

        // 로그인 상태 저장
        user.setIsLoggedIn(true);
        memberRepository.save(user);

        return LoginResponse.builder()
                .nickname(user.getNickname())
                .roles(user.getRoles())
                .token(jwtProvider.createToken(user.getUserName(), user.getRoles()))
                .build();
    }

    public boolean isDuplicateByUserName(String userName) {
        return memberRepository.existsByUserName(userName);
    }

    public boolean isDuplicateByNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    public boolean join(SignupRequest signupRequest) throws Exception {
        try {
            User user = User.builder()
                    .userName(signupRequest.getUserName())
                    .password(passwordEncoder.encode(signupRequest.getPassword()))
                    .nickname(signupRequest.getNickname())
                    .isLoggedIn(false)
                    .build();

            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));
            memberRepository.save(user);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }

    public LoginResponse getUser(String userName) throws Exception {
        User user = memberRepository.findByUserName(userName)
                .orElseThrow(() -> new Exception("계정을 찾을 수 없습니다."));
        return LoginResponse.builder()
                .nickname(user.getNickname())
                .roles(user.getRoles())
                .token(jwtProvider.createToken(user.getUserName(), user.getRoles()))
                .build();
    }

    public void logout(String userName) {
        User user = memberRepository.findByUserName(userName).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정 정보입니다."));

        // 로그인 상태 저장
        user.setIsLoggedIn(false);
        memberRepository.save(user);
    }

    public boolean isLoggedIn(String userName) {
        User user = memberRepository.findByUserName(userName).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정 정보입니다."));

        // 중복 로그인 체크
        if (user.getIsLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }
}

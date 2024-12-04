package com.royalcat.photon.service;

import com.royalcat.member.entity.User;
import com.royalcat.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhotonService {

    private final MemberRepository memberRepository;

    public void updatePlayerStatus(String reason, String nickName)
    {
        int reasonCode = Integer.parseInt(reason);

        //서버 끊김으로 인한 비정상 종료
        if(reasonCode >= 0 && reasonCode <= 4)
        {
            User user = memberRepository.findByUserName(nickName).orElseThrow(() ->
                    new BadCredentialsException("잘못된 계정 정보입니다."));

            user.setIsLoggedIn(false);
            memberRepository.save(user);
        }else if(reasonCode == 101)
        {
            //room -> lobby 상태로 전환
        }
    }

}

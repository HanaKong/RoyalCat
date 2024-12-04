package com.royalcat.photon.controller;

import com.royalcat.photon.service.PhotonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/photon")
@RequiredArgsConstructor
public class PhotonController {

    private final PhotonService photonService;

    @PostMapping("/disconnect")
    public ResponseEntity<?> disconnect(@RequestBody Map<String, Object> body) {

        //String userId = (String) body.get("UserId");//유저 uid
        //String gameId = (String) body.get("GameId");//나간 방 이름
        String reason = (String) body.get("Reason");//"Reason101" -> 정상종료, "Reason1" -> 강제종료
        String nickName = (String) body.get("NickName");

        System.out.println(nickName+" "+reason+"나감");

        //플레이어 서비스 로직
        photonService.updatePlayerStatus(reason, nickName);

        return ResponseEntity.ok(nickName+" 플레이어 연결 끊김");
    }

    @PostMapping("/room/create")
    public ResponseEntity<?> createRoom(@RequestBody Map<String, Object> body) {

        //플레이어 서비스 로직
        //System.out.println("방 생성됨");

        return ResponseEntity.ok("방생성됨 res");
    }

    @PostMapping("/room/join")
    public ResponseEntity<?> joinRoom(@RequestBody Map<String, Object> body) {

        //플레이어 서비스 로직
        //System.out.println("방 들어감");

        return ResponseEntity.ok("방들어감 res");
    }

    @GetMapping("/test")
    public String test(){
        return "hi!";
    }
}

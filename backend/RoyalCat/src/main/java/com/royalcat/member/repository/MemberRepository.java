package com.royalcat.member.repository;

import com.royalcat.member.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<User, Long> {

    boolean existsByUserName(String userName);

    boolean existsByNickname(String nickname);

    Optional<User> findByUserName(String userName);
}

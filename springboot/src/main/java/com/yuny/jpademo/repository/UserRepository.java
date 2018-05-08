package com.yuny.jpademo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuny.jpademo.pojo.User;


//
public interface UserRepository extends JpaRepository<User, Long> {
}

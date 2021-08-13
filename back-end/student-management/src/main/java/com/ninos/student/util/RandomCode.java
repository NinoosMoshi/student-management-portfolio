package com.ninos.student.util;

import java.util.UUID;

public class RandomCode {

    public static String getCode(){
        return UUID.randomUUID().toString();
    }

}

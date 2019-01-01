package org.mkh.framework.service.util;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class StringUtility {
    public static String toUTF8(String isoString) {
        ByteBuffer byteBuff = StandardCharsets.UTF_8.encode(isoString);
        return new String(byteBuff.array(),StandardCharsets.UTF_8);
    }
}

package lexer;

import java.io.*;
import java.util.*;

public class Lexer {
    private Reader reader;
    private int peeked = -1;
    private Map<String, String> alias = new HashMap<>();

    public Lexer(Reader reader) {
        this.reader = reader;

        alias.put("argh", "yar");
        alias.put("m'hartys", "yar");
        alias.put("r", "yar");

        alias.put("or", "and");

        alias.put("the", "ye");
        alias.put("them", "ye");
        alias.put("that", "ye");
        alias.put("those", "ye");
        alias.put("it", "ye");
        alias.put("i", "ye");
        alias.put("me", "ye");
        alias.put("mine", "ye");
        alias.put("you", "");
        alias.put("your", "ye");

        alias.put("do", "does");
        alias.put("shoot", "fire");
    }

    private int peekChar() throws IOException {
        if (peeked == -1) {
            peeked = reader.read();
        }
        return peeked;
    }

    private int nextChar() throws IOException {
        int result = peekChar();
        peeked = -1;
        return result;
    }

    private boolean isString(int c) {
        return Character.isAlphabetic(c) || c == '\'';
    }

    private boolean isNumber(int c) {
        return Character.isDigit(c) || c == '-' || c == '.';
    }

    private String nextString() throws IOException {
        StringBuilder builder = new StringBuilder();
        for (; ; ) {
            int c = peekChar();
            if (c == -1 || !isString(c)) {
                String result = builder.toString();
                return alias.getOrDefault(result, result);
            }
            builder.append((char) Character.toLowerCase(nextChar()));
        }
    }

    private double nextNumber() throws IOException {
        StringBuilder builder = new StringBuilder();
        for (;;) {
            int c = peekChar();
            if (c == -1 || !isNumber(c)) {
                return Double.parseDouble(builder.toString());
            }
            builder.append((char)nextChar());
        }
    }

    public Token nextToken() throws Exception {
        while (Character.isWhitespace(peekChar())) {
            nextChar();
        }

        int c = peekChar();
        if (isString(peekChar())) {
            return new Token(nextString());
        } else if (isNumber(c)) {
            return new Token(nextNumber());
        } else if (c == -1) {
            return new Token();
        } else {
            throw new Exception("Unknown character");
        }
    }
}

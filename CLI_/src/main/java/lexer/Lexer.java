package lexer;

import java.io.*;

public class Lexer {
    private Reader reader;
    private int peeked = -1;

    public Lexer(Reader reader) {
        this.reader = reader;
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

    private String nextString() throws IOException {
        StringBuilder builder = new StringBuilder();
        for (;;) {
            int c = peekChar();
            if (c == -1 || !Character.isAlphabetic(c)) {
                return builder.toString();
            }
            builder.append((char)Character.toLowerCase(nextChar()));
        }
    }

    private boolean isNumber(int c) {
        return Character.isDigit(c) || c == '-' || c == '.';
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
        if (Character.isAlphabetic(peekChar())) {
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

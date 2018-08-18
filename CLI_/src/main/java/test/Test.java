package test;

import lexer.*;
import java.io.*;

public class Test {
    public static void main(String[] args) throws Exception {
        Lexer lexer = new Lexer(new StringReader("Hello World  foo       bar"));
        Token token;
        while ((token = lexer.nextToken()).getType() != Token.Type.EOF) {
            System.out.println(token.getString());
        }
    }
}

package test;

import lexer.*;
import python.*;
import java.io.*;

public class Test {
    public static void main(String[] args) throws Exception {
        Lexer lexer = new Lexer(new StringReader("Hello World  foo       bar 1 2 -3 4.5 -6.7"));
        Token token;
        while ((token = lexer.nextToken()).getType() != Token.Type.EOF) {
            if (token.getType() == Token.Type.STRING) {
                System.out.println("STRING: " + token.getString());
            } else {
                System.out.println("NUMBER: " + token.getNumber());
            }
        }
        System.out.println("EOF");

        Python python = new Python("test.py", "0");
        python.callFunction("hello_world", null);
        python.run();
    }
}

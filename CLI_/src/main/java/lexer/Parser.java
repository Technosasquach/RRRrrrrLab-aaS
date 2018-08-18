package lexer;

import python.*;

import java.util.*;
import java.io.*;

public class Parser {
    private static Lexer lexer;
    private static StringBuilder builder;
    private static Python python;
    private static List<Python.Param> params;

    private static boolean checkCall(Token token) throws Exception {
        if (token.getString().equals("yar")) {
            builder.append("func");
            python.callFunction(builder.toString(), params);
            builder.setLength(0);
            params.clear();
            return true;
        } else {
            return false;
        }
    }

    public static void main(String[] args) throws Exception {
        String process = args[0];
        String file = args[1];
        String script = args[2];

        lexer = new Lexer(new FileReader(file));
        python = new Python(script, process);
        builder = new StringBuilder();
        params = new ArrayList<>();

        for (;;) {
            Token token = lexer.nextToken();

            // Within here handle the python files
            if (token.getType() == Token.Type.EOF) {

                // TODO Handle the break
                break;

            } else if (token.getString().equals("with")) {

                for (;;) {
                    token = lexer.nextToken();
                    if (checkCall(token)) {
                        break;
                    } else if (!token.getString().equals("and")) {
                        Python.Param param = new Python.Param();
                        param.name = token.getString();
                        param.value = lexer.nextToken().getNumber();
                        params.add(param);
                    }
                }

            } else if (!checkCall(token)) {
                builder.append(token.getString());
                builder.append("_");
            }
        }

        python.run();
    }
}

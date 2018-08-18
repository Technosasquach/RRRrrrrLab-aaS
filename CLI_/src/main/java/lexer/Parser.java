package lexer;
import python.Python;

import java.io.*;

public class Parser {

    public static void main(String[] args) throws Exception {
        String file = args[0];
        String processid = args[1];
        Lexer lexer = new Lexer(new FileReader(file));

        Python py = new Python("test.py");

        StringBuilder sb = new StringBuilder();
        for (;;) {
            Token token = lexer.nextToken();

            // Within here handle the python files
            if (token.getType() == Token.Type.EOF) {

                // TODO Handle the break
                break;
            } else if (token.getString().equals("arrgh")) {
                sb.append("func");
                py.callFunction(sb.toString());
                sb.setLength(0);

            } else {
                sb.append(token.getString());
                sb.append("_");
            }
        }

        py.run();
    }
}

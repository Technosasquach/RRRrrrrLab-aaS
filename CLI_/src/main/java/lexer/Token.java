package lexer;

public class Token {
    public enum Type {
        STRING,
        NUMBER,
        EOF
    }

    private Type type;
    private String str;
    private double num;

    public Token() {
        type = Type.EOF;
    }

    public Token(String str) {
        type = Type.STRING;
        this.str = str;
    }

    public Token(double num) {
        type = Type.NUMBER;
        this.num = num;
    }

    public Type getType() {
        return type;
    }

    public String getString() throws Exception {
        if (type == Type.STRING) {
            return str;
        } else {
            throw new Exception("Expected string");
        }
    }

    public double getNumber() throws Exception {
        if (type == Type.NUMBER) {
            return num;
        } else {
            throw new Exception("Expected number");
        }
    }
}

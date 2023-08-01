package moldel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DatabaseConnection {
    private static Connection conn;

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        if (conn == null) {
            Class.forName("com.mysql.cj.jdbc.Driver"); 
            String url = "jdbc:mysql://localhost:3306/movierental"; 
            String username = "root"; 
            String password = "tiger"; 

            conn = DriverManager.getConnection(url, username, password);
        }

        return conn;
    }
}


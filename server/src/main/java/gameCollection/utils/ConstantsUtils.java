package gameCollection.utils;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;
import java.util.Optional;

/**
 * Utils class, manages a {@link Gson} singleton in order to access constants, used throughout the project.
 */
public class ConstantsUtils {

    /**
     * GSon object to parse the JSON-File, which contains all the constants
     **/
    private static Gson gson;

    /**
     * Map of Key-Value Constants, read from the JSON-File.
     **/
    private static Map<String, String> jsonConstants;

    // private constructor
    private ConstantsUtils() {
    }

    /**
     * Helper Method, initializes the JSON-Constants map.
     *
     * @throws RuntimeException If the corresponding json file was not found.
     */
    private static void initializeJSonConstants() {
        try (FileReader reader = new FileReader("src/main/resources/static/constants.json")) {
            Type mapType = new TypeToken<Map<String, String>>() {
            }.getType();
            jsonConstants = gson.fromJson(reader, mapType);

        } catch (IOException e) {
            throw new RuntimeException("Unable to fetch the json Constants", e);
        }
    }

    /**
     * @param constantKey The key value of the JSON-Constant.
     * @return The corresponding value of the key.
     * @throws IllegalArgumentException If the key has not been defined in the json file.
     */
    public static String getConstantValue(final String constantKey) {
        if (gson == null) {
            gson = new Gson();
        }

        if (jsonConstants == null) {
            initializeJSonConstants();
        }

        Optional<String> optionalResult = Optional.ofNullable(jsonConstants.get(constantKey));
        return optionalResult.orElseThrow(() -> new IllegalArgumentException("There exists no value for the passed key: " + constantKey));
    }
}

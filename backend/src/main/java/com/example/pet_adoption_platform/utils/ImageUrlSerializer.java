package com.example.pet_adoption_platform.utils;

import com.example.pet_adoption_platform.entities.Image;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class ImageUrlSerializer extends JsonSerializer<List<Image>> {
    @Override
    public void serialize(List<Image> images, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        List<String> urls = images.stream().map(Image::getUrl).toList();
        jsonGenerator.writeObject(urls);
    }
}

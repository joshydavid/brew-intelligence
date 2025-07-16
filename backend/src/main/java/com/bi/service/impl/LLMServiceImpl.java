package com.bi.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bi.service.LLMService;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LLMServiceImpl implements LLMService {
    private final Client client;

    @Value("${gemini.model}")
    private String GEMINI_MODEL;

    @Override
    public String generateLLMResponse(List<Content> prompt) {
        try {
            GenerateContentResponse response = client.models.generateContent(
                    GEMINI_MODEL,
                    prompt,
                    null);
            return response.text();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate text from input", e);
        }
    }
}

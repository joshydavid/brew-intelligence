package com.bi.service;

import java.util.List;

import com.google.genai.types.Content;

public interface LLMService {
    String generateLLMResponse(List<Content> prompt);
}

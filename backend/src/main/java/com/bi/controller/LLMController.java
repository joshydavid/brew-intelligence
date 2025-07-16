package com.bi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bi.constant.ApiPaths;
import com.bi.dto.LLMResponseDTO;
import com.bi.service.LLMService;
import com.google.genai.types.Content;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LLMController {
    private final LLMService llmService;

    @PostMapping(ApiPaths.LLM_API)
    public ResponseEntity<LLMResponseDTO> generateContent(@Valid @RequestBody List<Content> dto) {
        String llmResponse = this.llmService.generateLLMResponse(dto);
        LLMResponseDTO response = new LLMResponseDTO(llmResponse);
        return ResponseEntity.ok(response);
    }
}

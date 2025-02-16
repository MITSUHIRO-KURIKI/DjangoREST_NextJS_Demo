def MODEL_NAME_CHOICES():
    MODEL_NAME_CHOICES_TUPLE = (
        # gpt
        (1,  'gpt-3.5-turbo'),
        (10, 'gpt-4'),
        (11, 'gpt-4-turbo'),
        (12, 'gpt-4o-mini'),
        (20, 'gpt-4o'),
        # gimini (100以上)
        (100, 'gemini-1.5-flash-001'),
        (101, 'gemini-1.5-pro-001'),
        (110, 'gemini-1.5-flash-002'),
        (111, 'gemini-1.5-pro-002'),
        (120, 'gemini-exp-1206'),
        (130, 'gemini-2.0-flash-thinking-exp-1219'),
        (131, 'gemini-2.0-flash-exp'),
    )
    return MODEL_NAME_CHOICES_TUPLE
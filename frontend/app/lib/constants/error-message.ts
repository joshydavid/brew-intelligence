export enum CoffeeRecipeErrMsg {
  COFFEE_DOSE_REQUIRED = "Coffee dose is required",
  COFFEE_DOSE_NUMBER = "Coffee dose must be a number",
  COFFEE_DOSE_MIN = "Coffee dose must be at least 15g",
  WATER_AMOUNT_REQUIRED = "Water amount is required",
  WATER_AMOUNT_NUMBER = "Water amount must be a number",
  WATER_AMOUNT_MIN = "Water amount must be at least 10ml",
  BREW_TEMP_REQUIRED = "Brew temperature is required",
  BREW_TEMP_NUMBER = "Brew temperature must be a number",
  BREW_TEMP_MIN = "Brew temperature must be at least 0°C",
  BREW_TIME_REQUIRED = "Brew time is required",
  BREW_INSTRUCTIONS_MIN = "At least one brew step is required",
  BREW_INSTRUCTION_EMPTY = "Each brew step must not be empty",
  CREATED_BY_REQUIRED = "Barista name is required",
}

export enum CoffeeListingErrMsg {
  COFFEE_NAME_REQUIRED = "Coffee name is required",
  ROAST_DATE_REQUIRED = "Roast date is required",
  WEIGHT_REQUIRED = "Weight is required",
  WEIGHT_NUMBER = "Weight must be a number",
  WEIGHT_MIN = "Weight must be greater than 0",
  ROAST_TYPE_REQUIRED = "Roast type is required",
  BREW_METHOD_REQUIRED = "Brew method is required",
}

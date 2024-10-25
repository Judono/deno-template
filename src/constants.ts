enum UserRoles {
  TENANT = "TENANT",
  LANDLORD = "LANDLORD",
}

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export { HttpStatus, UserRoles };
package org.mkh.framework.security;

import org.springframework.security.core.AuthenticationException;

/**
 * This exception is thrown in case of a not enabled user trying to authenticate.
 */
public class UserNotActivatedException extends AuthenticationException {

    private static final long serialVersionUID = 1L;

    public UserNotActivatedException(String message) {
        super(message);
    }

    public UserNotActivatedException(String message, Throwable t) {
        super(message, t);
    }
}

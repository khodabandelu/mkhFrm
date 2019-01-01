package org.mkh.framework.service.dto.security;

import lombok.*;

/**
 * A DTO representing a password change required data - current and new password.
 */

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeDTO {
    private String currentPassword;
    private String newPassword;
}

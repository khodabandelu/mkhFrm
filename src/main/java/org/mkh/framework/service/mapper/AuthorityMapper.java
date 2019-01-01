package org.mkh.framework.service.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;
import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.service.dto.security.AuthorityDTO;

import java.util.List;

@Mapper
public interface AuthorityMapper {

    AuthorityMapper mapper = Mappers.getMapper(AuthorityMapper.class);

    @Mappings({
        @Mapping(source = "parent.id", target = "parentId")
    })
    AuthorityDTO toDto(Authority authority);

    @InheritInverseConfiguration
    Authority dtoTo(AuthorityDTO authorityDTO);

    List<AuthorityDTO> toListDto(List<Authority> authorities);

}

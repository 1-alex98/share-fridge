package com.sharefridge.pool;

import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController()
@RequiredArgsConstructor
@RequestMapping(path = "/api/pool")
public class PoolController {
    private final PoolService poolService;

    @GetMapping()
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Pool> getAllPools(@Param("id") String id){
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Show this message");
        //return poolService.getAllPools(id);
    }

    @GetMapping()
    @RequestMapping(path = "{id:.*}/invite")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String generateInvite(@PathVariable("id") String id){
        return poolService.generateInviteToken(id);
    }

    @PostMapping()
    @RequestMapping(path = "invite")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String join(@RequestBody String token){
        return poolService.joinPool(token);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public Pool createPool(@RequestBody Pool pool){
        return poolService.createPool(pool);
    }

    @PatchMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public Pool patchPool(@RequestBody Pool pool){
        return poolService.patchPool(pool);
    }
}

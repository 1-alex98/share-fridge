package com.sharefridge.pool.expense;

import com.sharefridge.pool.Pool;
import com.sharefridge.pool.PoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequiredArgsConstructor
@RequestMapping(path = "/api/pool/")
public class ExpenseController {

    private final PoolService poolService;

    @PostMapping(path = "{id:.*}/expense", consumes={"application/json;charset=UTF-8"})
    public Pool createExpense(@RequestBody Expense expense, @PathVariable("id") String id){
        return poolService.addExpense(id, expense);
    }
}

package com.sharefridge.pool.expense;

import com.sharefridge.pool.PoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@RequiredArgsConstructor
@RequestMapping(path = "/api/pool/")
public class ExpenseController {

    private final PoolService poolService;

    @PostMapping(path = "{id:.*}/expense", consumes = {"application/json;charset=UTF-8"})
    public String createExpense(@RequestBody Expense expense, @PathVariable("id") String id) {
        return poolService.addExpense(id, expense);
    }

    @PostMapping(path = "{id:.*}/expense/{expenseId:.*}/image", consumes = {"multipart/form"})
    public void uploadImage(@PathVariable("id") String poolId, @PathVariable("expenseId") String expenseId,
                            @RequestParam("file") MultipartFile file) {
        poolService.uploadImage(poolId, expenseId, file);
    }
}

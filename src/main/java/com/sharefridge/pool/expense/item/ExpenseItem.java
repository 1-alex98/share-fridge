package com.sharefridge.pool.expense.item;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Data
public class ExpenseItem {
    @Id
    private String id;
    @NotNull
    private String name;
    @NotNull
    private int amount;
}

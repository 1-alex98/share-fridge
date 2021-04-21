package com.sharefridge.pool.expense.item;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(of = "id")
public class ExpenseItem {
    @Id
    private String id;
    @NotNull
    private String name;
    @NotNull
    private int amount;
}

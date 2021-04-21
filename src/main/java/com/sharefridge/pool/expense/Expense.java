package com.sharefridge.pool.expense;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sharefridge.pool.expense.item.ExpenseItem;
import com.sharefridge.pool.member.Member;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(of = "identification")
public class Expense {
    private String identification= UUID.randomUUID().toString();
    @NotNull
    private String name;
    private String description;
    private String shop;
    private String category;
    @NotNull
    @Min(0)
    private long amount;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private List<String> imageNames;
    private List<ExpenseItem> items;
    @NotNull
    private Member creator;
    @NotNull
    @NotEmpty
    private List<Member> involved;

    public void setId(String id) {
        if(id != null) return;
        this.identification = UUID.randomUUID().toString();
    }
}

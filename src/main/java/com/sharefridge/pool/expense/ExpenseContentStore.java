package com.sharefridge.pool.expense;

import org.springframework.content.commons.repository.ContentStore;

import java.util.UUID;

public interface ExpenseContentStore extends ContentStore<Expense, UUID> {
}

package com.sharefridge.frame;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.util.Assert;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Slf4j
public class RecursiveValidatingMongoEventListener extends AbstractMongoEventListener<Object> {


	private final Validator validator;

	public RecursiveValidatingMongoEventListener(Validator validator) {

		Assert.notNull(validator, "Validator must not be null!");
		this.validator = validator;
	}


	@Override
	public void onBeforeSave(BeforeSaveEvent<Object> event) {

		log.debug("Validating top object: {}", event.getSource());
		Object source = event.getSource();
		if (!source.getClass().getPackage().getName().startsWith("com.sharefridge")) return;
		Set<Object> visited = new HashSet<>();
		validateObject(source, visited);
	}

	private void validateObject(Object source, Set<Object> visited) {
		log.debug("Validating object: {}", source);
		Set<ConstraintViolation<Object>> violations = validator.validate(source);
		if (!violations.isEmpty()) {

			log.info("During object: {} validation violations found: {}", source, violations);
			throw new ConstraintViolationException("Checking object of Type %s failed".formatted(source.getClass()), violations);
		}

		visited.add(source);

		validateSubjects(source, visited);
	}

	private void validateSubjects(Object source, Set<Object> visited) {
		Arrays.stream(source.getClass().getDeclaredFields())
				.filter(this::isInMainPackageOrisCollection)
				.forEach(field -> validateSubObject(source, visited, field));
	}

	private boolean isInMainPackageOrisCollection(java.lang.reflect.Field field) {
		return field.getType().getPackage() != null &&
				(field.getType().getPackage().getName().startsWith("com.sharefridge")
						|| Collection.class.isAssignableFrom(field.getType())
				);
	}

	private void validateSubObject(Object source, Set<Object> visited, java.lang.reflect.Field field) {
		try {
			field.setAccessible(true);
			Object subObject = field.get(source);
			field.setAccessible(false);
			if (subObject == null) return;
			if (visited.contains(subObject)) return;
			if (Collection.class.isAssignableFrom(field.getType())) {
				((Collection<?>) subObject).forEach(o -> validateObject(o, visited));
				return;
			}
			validateObject(subObject, visited);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		}
	}
}

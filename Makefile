# Version update function
define update_version
	@current_version=$$(jq -r .version manifest.json); \
	echo "Current version: $$current_version"; \
	new_version=$$(echo $$current_version | awk -F. -v OFS=. -v part=$(1) '{if(part==1) $$1++; else if(part==2) $$2++; else $$3++; if(part==1) $$2=$$3=0; else if(part==2) $$3=0; print}'); \
	echo "New version: $$new_version"; \
	jq '.version = "'"$$new_version"'"' manifest.json > manifest.json.tmp && mv manifest.json.tmp manifest.json
endef

.PHONY: bump-patch
bump-patch:
	@$(call update_version,3)

.PHONY: bump-minor
bump-minor:
	@$(call update_version,2)

.PHONY: bump-major
bump-major:
	@$(call update_version,1)

.PHONY: bump-dump-version
bump-dump-version:
	@echo "$(shell jq -r .version manifest.json)"

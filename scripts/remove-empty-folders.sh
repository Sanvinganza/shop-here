#!/bin/bash

# Список папок для исключения (через |)
EXCLUDE_PATHS="node_modules|.git|.next|dist|build"

echo "🧹 Очистка пустых папок (кроме: $EXCLUDE_PATHS)..."

find . -type d -empty | while read dir; do
    # Проверяем, не является ли папка исключением
    if [[ ! "$dir" =~ ($EXCLUDE_PATHS) ]]; then
        echo "Удаляю: $dir"
        rmdir "$dir" 2>/dev/null || true
    fi
done

echo "✅ Пустые папки удалены!"
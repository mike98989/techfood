<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MapDetectedBacteria extends Model
{
    use HasFactory;
    protected $table="map_detected_bacteria";
    protected $guarded=[];

        public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }

    public function coordinate(): BelongsTo{
        return $this->belongsTo(MapDetectedBacteriaCoordinates::class, 'coordinate_id','id');
    }


}
        
